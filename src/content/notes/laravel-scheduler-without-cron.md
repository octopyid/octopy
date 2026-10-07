---
title: "Running Laravel Scheduler Without Cron Job: Is It Possible?"
category: Laravel
tags: [ scheduler, worker ]
date: 2025-05-07 00:30
---

Typically, Laravel Scheduler runs with cron jobs that execute `php artisan schedule:run` every minute. But what if we try running it without cron at all? Is it possible? The answer
is yes, with a few alternative techniques. This is perfect for those who like tinkering or are limited by access to cron (for example, on shared hosting).

## 1. Scheduler via Laravel Worker

You can create a PHP worker that runs in the background and triggers `schedule:run` every minute using a loop.

Example script:

```php
while (true) {
    exec('php /path/to/artisan schedule:run >> /dev/null 2>&1');
    sleep(60);
}
```

Run it with:

```bash
php scheduler-worker.php &
```

**Downside:**

- If the server restarts, you need to manually restart the script (solution: use Supervisor or systemd).
- This method could lead to inefficiency if not handled properly, as the script will run continuously and might consume unnecessary resources over time.
- If there's an error in the script, it might not be caught unless you implement error logging, which can make it harder to troubleshoot.

## 2. Use Systemd Timer (Linux Native)

A modern alternative to cron in Linux is the systemd timer. It’s more flexible, and the logs are neater.

### Steps:

Create a service file: `/etc/systemd/system/laravel-schedule.service`

```ini
[Unit]
Description = Laravel Schedule Runner

[Service]
Type = oneshot
WorkingDirectory = /path/to/laravel
ExecStart = /usr/bin/php artisan schedule:run
```

Create a timer file: `/etc/systemd/system/laravel-schedule.timer`

```ini
[Unit]
Description = Run Laravel Scheduler every minute

[Timer]
OnCalendar = *-*-* *:*:00
AccuracySec = 1s
Unit = laravel-schedule.service

[Install]
WantedBy = timers.target
```

Enable and start the timer:

```bash
systemctl enable laravel-schedule.timer
systemctl start laravel-schedule.timer
```

This is more stable than cron, and you can view the status with `systemctl list-timers`.

**Downside:**

- If you aren't familiar with `systemd`, the configuration can be a bit tricky and may require a learning curve.
- If the systemd service fails for any reason (e.g., PHP crashes), it might be less obvious how to restart it compared to a more traditional cron setup.

## 3. Web Scheduler Trigger via Ping (Push-Based)

Create an endpoint that can be pinged externally, for example, from services like UptimeRobot, GitHub Actions, or another server.

Example route:

```php
Route::get('/run-scheduler', function () {
    Artisan::call('schedule:run');
    return 'OK';
});
```

Make sure to add authentication/token to avoid misuse.

**Downside:**

- This approach exposes an endpoint to the outside world, which could potentially be abused if not properly secured with authentication tokens or other security measures.
- If the external service (like UptimeRobot or GitHub Actions) is down, it could prevent the scheduler from running.
- This is less ideal for critical tasks that need to run reliably every minute, as it depends on external services.

## 4. Use Queue Worker + Inline Scheduler

If your queue is always active, add the scheduler to the worker loop.

Modify the queue worker script:

```php
while (true) {
    Artisan::call('schedule:run');
    Artisan::call('queue:work --stop-when-empty');
    sleep(60);
}
```

This is suitable for small systems without Supervisor, but make sure the load is light.

**Downside:**

- Like the PHP loop script, this method requires the queue worker to always be running, which can consume server resources even if no jobs are queued.
- If the queue worker crashes, the scheduler may stop running until the worker is restarted.
- This solution is more suitable for systems with light tasks. Heavy workloads might overwhelm the worker process, leading to performance degradation.

## Conclusion

So, can you run Laravel Scheduler without cron? Absolutely. You can use:

- PHP loop script
- systemd timer
- trigger via external endpoint
- inline scheduler in the queue worker

However, each method has its own downsides:

- **PHP loop script** may consume resources unnecessarily and needs to be manually restarted if the server reboots.
- **systemd timer** requires familiarity with systemd configuration and may be harder to debug if something goes wrong.
- **Web scheduler trigger** depends on external services and exposes a potential security risk.
- **Queue worker with inline scheduler** requires the queue worker to be always active and could lead to performance issues under heavy load.

If you’re tinkering with Laravel on a small VPS or in a limited environment, these techniques can be a creative and efficient alternative solution, but consider the trade-offs for
reliability and resource consumption.
