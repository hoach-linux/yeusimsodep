function processTasks(tasks: (() => Promise<void>)[]) {
    const validTasks = tasks.filter((task) => typeof task === 'function'); // Filter out non-function elements

    const deleteTasks = validTasks.map(async (task) => {
        try {
            await task();
        } catch (error) {
            console.error(error)
        }
    });

    Promise.all(deleteTasks).then(() => {
        postMessage('All tasks finished');
    });
}

self.onmessage = (event) => {
    const tasks: (() => Promise<void>)[] = event.data.tasks;
    postMessage('Worker is working');

    processTasks(tasks);
};