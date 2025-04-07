import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';

export default function List(props) {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const {
        routines,
        setRoutines,

        setRoutine,

        setTabIndex,

        setId,

        setIsEditing
    } = props;

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onEditPressHandler = (id) => {

        setId(id);
        setIsEditing(true);
    };

    const onPlayPressHandler = (id) => {

        setRoutine(routines.find(routine => routine.id === id));
        setTabIndex(1);
    };

    const onAddPressHandler = () => {

        setRoutines((previousState) => {

            const newState = JSON.parse(JSON.stringify(previousState));

            newState.push({
                id: uuid.v4(),
                name: 'Sample Name',
                tasks: [
                    {
                        index: 0,
                        name: 'Wait',
                        duration: 60,
                        color: 'blue'
                    }
                ]
            });

            return newState;
        });
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

                    <TouchableOpacity key={`${key}-edit-button`} style={styles.routineButton} onPress={() => onEditPressHandler(routine.id)}>
                        <FontAwesomeIcon key={`${key}-edit-icon`} size={18} color='#ebebeb' name='edit' />
                    </TouchableOpacity>

                    <Text key={`${key}-tasks-count`} style={styles.routineTasks}>Tasks : {routine.tasks.length}</Text>

                    <TouchableOpacity key={`${key}-play-button`} style={styles.routineButton} onPress={() => onPlayPressHandler(routine.id)}>
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
    CSS STYLES
    ---------------------------------------------------------------------- */

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column'
        },
        routineContainer: {
            flexDirection: 'column',
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
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
        routineButton: {
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
        footerContainer: {
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingRight: 35,
            marginTop: 40
        },
        footerButton: {
            paddingHorizontal: 10,
            width: 50,
            height: 35,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#fff',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.container}>

            {getDisplayableRoutines()}

            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerButton} onPress={onAddPressHandler}>
                    <FeatherIcon size={18} color='#333' name='plus' />
                </TouchableOpacity>
            </View>

        </View>
    );
};