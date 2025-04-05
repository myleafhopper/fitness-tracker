import {
    useState,
    useEffect
} from 'react';

import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
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

export default function App() {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onTogglePressHandler = () => {
        setIsActive(previousState => !previousState);
    };

    const onResetPressHandler = () => {

        setRemainingSecs(0);
        setIsActive(false);
    };

    /* ----------------------------------------------------------------------
    USE-EFFECTS
    ---------------------------------------------------------------------- */

    useEffect(() => {

        let interval = null;

        if (isActive) {

            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000);

        } else if (!isActive && remainingSecs !== 0) {

            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [isActive, remainingSecs]);

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <SafeAreaView style={styles.root}>

            <StatusBar barStyle='light-content' />

            <View style={styles.middleContainer}>

                <TouchableOpacity style={styles.button} onPress={onResetPressHandler}>
                    <Icon size={30} color='#ebebeb' name='undo' />
                </TouchableOpacity>

                <View style={styles.timerCircle}>
                    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={onTogglePressHandler}>
                    <Icon size={30} color='#ebebeb' name={isActive ? 'pause' : 'play'} />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
};

/* ----------------------------------------------------------------------
CSS STYLES
---------------------------------------------------------------------- */

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#07121B'
    },
    middleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    timerCircle: {
        borderWidth: 10,
        borderColor: '#32a852',
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        color: '#fff',
        fontSize: 45
    },
    button: {
        borderWidth: 5,
        borderColor: '#ebebeb',
        width: screen.width / 5,
        height: screen.width / 5,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});