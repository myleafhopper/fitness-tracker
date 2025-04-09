/* ----------------------------------------------------------------------
SETUP
---------------------------------------------------------------------- */

const task = {
    index: 0,
    name: 'Wait',
    duration: 60,
    color: 'blue'
};

/* ----------------------------------------------------------------------
EXPORTS
---------------------------------------------------------------------- */

export const getRemainingTime = (time) => {

    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;

    return {
        mins: formatNumber(mins),
        secs: formatNumber(secs)
    };
};

export const getDefaultRoutine = (props) => {

    if (props.hasOwnProperty('routine') &&
        props.routine !== undefined &&
        props.routine !== null) {

        return props.routine;

    } else {

        return {
            id: '00000000-0000-0000-0000-000000000000',
            name: 'No Routine Selected',
            repetitions: 1,
            tasks: [task]
        };
    }
};

export const getInitialTask = (routine) => {

    if (!routine.hasOwnProperty('tasks') ||
        routine.tasks === undefined ||
        routine.tasks === null ||
        routine.tasks.length === 0) {

        return task;

    } else {

        return routine.tasks[0];
    }
};

/* ----------------------------------------------------------------------
FUNCTIONS
---------------------------------------------------------------------- */

const formatNumber = (number) => {
    return `0${number}`.slice(-2);
};