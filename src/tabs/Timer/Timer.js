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

import {
    getRemainingTime,
    getDefaultRoutine,
    getInitialTask
} from './Helper';

const screen = Dimensions.get('window');

export default function Timer(props) {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const routine = getDefaultRoutine(props);
    const [task, setTask] = useState(getInitialTask(routine));
    const [remainingSecs, setRemainingSecs] = useState(task.duration);
    const [isActive, setIsActive] = useState(false);

    const { mins, secs } = getRemainingTime(remainingSecs);

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onTogglePressHandler = () => {
        setIsActive(previousState => !previousState);
    };

    const onResetPressHandler = () => {

        const task = getInitialTask(routine);

        setTask(task);
        setRemainingSecs(task.duration);
        setIsActive(false);
    };

    /* ----------------------------------------------------------------------
    FUNCTIONS
    ---------------------------------------------------------------------- */

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
        timerCircle: {
            alignItems: 'center',
            justifyContent: 'center',
            width: screen.width / 2,
            height: screen.width / 2,
            borderRadius: screen.width / 2,
            borderWidth: 10,
            borderColor: isActive && task.color === 'green' ?
                '#02c437' : isActive && task.color === 'blue' ?
                    'dodgerblue' : isActive && task.color === 'red' ?
                        '#de0d31' : '#666',
        },
        timerText: {
            color: isActive ? '#fff' : '#666',
            fontSize: 45
        },
        timerButton: {
            borderWidth: 5,
            borderColor: isActive ? '#ebebeb' : '#666',
            borderRadius: screen.width / 5,
            width: screen.width / 5,
            height: screen.width / 5,
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

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.tab}>

            <View style={styles.headerContainer}>

                <Text style={styles.headerRoutineText} numberOfLines={1} ellipsizeMode='tail'>Routine : {routine.name}</Text>

                <View style={{ height: 20 }} />

                <Text style={styles.headerTaskText} numberOfLines={1} ellipsizeMode='tail'>{`${task.index + 1} / ${routine.tasks.length} : ${task.name}`}</Text>

            </View>

            <View style={styles.timerContainer}>

                <TouchableOpacity style={styles.timerButton} onPress={onResetPressHandler}>
                    <Icon size={30} color={isActive ? '#ebebeb' : '#666'} name='undo' />
                </TouchableOpacity>

                <View style={styles.timerCircle}>
                    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                </View>

                <TouchableOpacity style={styles.timerButton} onPress={onTogglePressHandler}>
                    <Icon size={30} color={isActive ? '#ebebeb' : '#666'} name={isActive ? 'pause' : 'play'} />
                </TouchableOpacity>

            </View>

            <View style={styles.footerContainer}>
                {((task.index + 1) < routine.tasks.length) &&
                    <Text style={styles.footerText} numberOfLines={1} ellipsizeMode='tail'>
                        {`Next : ${routine.tasks[task.index + 1].name}`}
                    </Text>
                }
            </View>

        </View>
    );
};