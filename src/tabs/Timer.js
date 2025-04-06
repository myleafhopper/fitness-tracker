import {
    useState,
    useEffect
} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {

    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;

    return {
        mins: formatNumber(mins),
        secs: formatNumber(secs)
    };
};

export default function Timer(props) {

    const routine = {
        name: 'Standard Workout',
        tasks: [
            {
                index: 0,
                name: 'Push Ups',
                duration: 10,
                color: 'red'
            },
            {
                index: 1,
                name: 'Rest',
                duration: 5,
                color: 'green'
            }
        ]
    };

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const [task, setTask] = useState(routine.tasks[0]);
    const [remainingSecs, setRemainingSecs] = useState(task.duration);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onTogglePressHandler = () => {
        setIsActive(previousState => !previousState);
    };

    const onResetPressHandler = () => {

        setTask(routine.tasks[0]);
        setRemainingSecs(routine.tasks[0].duration);
        setIsActive(false);
    };

    /* ----------------------------------------------------------------------
    FUNCTIONS
    ---------------------------------------------------------------------- */

    const getTimerCircleStyle = () => {

        const style = {
            borderWidth: 10,
            width: screen.width / 2,
            height: screen.width / 2,
            borderRadius: screen.width / 2,
            borderColor: '#ebebeb',
            alignItems: 'center',
            justifyContent: 'center',
        };

        if (isActive && task !== undefined && task !== null) {
            style.borderColor = task.color === 'green' ?
                '#02c437' : task.color === 'blue' ?
                    '#0276c4' : '#de0d31';
        }

        return style;
    };

    /* ----------------------------------------------------------------------
    USE-EFFECTS
    ---------------------------------------------------------------------- */

    useEffect(() => {

        let interval = null;
        const nextTaskAvailable = (task.index + 1) < routine.tasks.length;

        if (isActive && remainingSecs >= 0) {

            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs - 1);
            }, 1000);

        } else if (isActive && remainingSecs < 0 && nextTaskAvailable) {

            clearInterval(interval);
            const nextTask = routine.tasks[task.index + 1];

            setTask(nextTask);
            setRemainingSecs(nextTask.duration);

        } else if (isActive && remainingSecs < 0 && !nextTaskAvailable) {

            clearInterval(interval);
            setIsActive(false);

            setTask(routine.tasks[0]);
            setRemainingSecs(routine.tasks[0].duration);

        } else if (!isActive && remainingSecs >= 0) {

            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [isActive, remainingSecs]);

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.tab}>

            <View style={styles.headerContainer}>

                <Text style={styles.headerRoutineText}>Routine : {routine.name}</Text>

                <View style={{ height: 20 }} />

                <Text style={styles.headerTaskText}>{`${task.index + 1}. ${task.name}`}</Text>

            </View>

            <View style={styles.timerContainer}>

                <TouchableOpacity style={styles.timerButton} onPress={onResetPressHandler}>
                    <Icon size={30} color='#ebebeb' name='undo' />
                </TouchableOpacity>

                <View style={getTimerCircleStyle()}>
                    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                </View>

                <TouchableOpacity style={styles.timerButton} onPress={onTogglePressHandler}>
                    <Icon size={30} color='#ebebeb' name={isActive ? 'pause' : 'play'} />
                </TouchableOpacity>

            </View>

            <View style={styles.footerContainer}>
                {((task.index + 1) < routine.tasks.length) &&
                    <Text style={styles.footerText}>
                        {`${task.index + 2}. ${routine.tasks[task.index + 1].name}`}
                    </Text>
                }
            </View>

        </View>
    );
};

/* ----------------------------------------------------------------------
CSS STYLES
---------------------------------------------------------------------- */

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: 'column'
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    headerRoutineText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerTaskText: {
        color: '#fff',
        fontSize: 20
    },
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    timerText: {
        color: '#fff',
        fontSize: 45
    },
    timerButton: {
        borderWidth: 5,
        borderColor: '#ebebeb',
        width: screen.width / 5,
        height: screen.width / 5,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    footerText: {
        color: '#fff',
        fontSize: 20
    },
});