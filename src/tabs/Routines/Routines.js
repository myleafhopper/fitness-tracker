import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Routines(props) {

    const routines = [{
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
    }];

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const { setTabIndex } = props;

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onPlayPressHandler = (index) => {

        console.log(index)
        setTabIndex(1);
    };

    /* ----------------------------------------------------------------------
    FUNCTIONS
    ---------------------------------------------------------------------- */

    const getDisplayableRoutines = () => {

        return routines.map((routine, index) => {

            const key = `routine-${index}`;

            return <View key={`${key}-container`} style={styles.routineContainer}>

                <Text key={`${key}-name`} style={styles.routineName} numberOfLines={1} ellipsizeMode='tail'>
                    {routine.name}
                </Text>

                <View key={`${key}-sub-container`} style={styles.routineSubContainer}>

                    <TouchableOpacity key={`${key}-edit-button`} style={styles.routineEditButton}>
                        <FontAwesomeIcon key={`${key}-edit-icon`} size={18} color='#ebebeb' name='edit' />
                    </TouchableOpacity>

                    <Text key={`${key}-tasks-count`} style={styles.routineTasks}>Tasks : {routine.tasks.length}</Text>

                    <TouchableOpacity key={`${key}-play-button`} style={styles.routineEditButton} onPress={() => onPlayPressHandler(index)}>
                        <FeatherIcon key={`${key}-play-icon`} size={18} color='#ebebeb' name='play' />
                    </TouchableOpacity>

                </View>

            </View>
        });
    };

    /* ----------------------------------------------------------------------
    USE-EFFECTS
    ---------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.tab}>

            {getDisplayableRoutines()}

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
    routineContainer: {
        flexDirection: 'column',
        margin: 20,
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: `rgba(255, 255, 255, 0.3)`,
        backgroundColor: `rgba(255, 255, 255, 0.1)`
    },
    routineName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#dbdbdb',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    routineSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    routineTasks: {
        paddingTop: 7,
        fontSize: 16,
        color: '#dbdbdb',
    },
    routineEditButton: {
        paddingHorizontal: 10,
        width: 50,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'dodgerblue',
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    routineEditText: {
        fontSize: 16,
        color: 'white',
    },
});