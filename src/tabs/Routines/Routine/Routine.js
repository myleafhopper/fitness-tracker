import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { useState, useEffect } from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import uuid from 'react-native-uuid';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Routine(props) {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const {
        id,
        setId,

        routines,
        setRoutines,

        setIsEditing
    } = props;

    const routine = routines.find(routine => routine.id === id);

    const [tasks, setTasks] = useState(routine !== undefined ? routine.tasks : []);

    const [routineName, setRoutineName] = useState(routine !== undefined ? routine.name : '');
    const [taskName, setTaskName] = useState('');

    const [repetitions, setRepetitions] = useState(routine !== undefined ? routine.repetitions.toString() : '1');
    const [taskDuration, setTaskDuration] = useState(0);
    const [taskIndex, setTaskIndex] = useState(null);

    const [isBlueColor, setIsBlueColor] = useState(true);
    const [isGreenColor, setIsGreenColor] = useState(false);
    const [isRedColor, setIsRedColor] = useState(false);

    const validRoutine = tasks.length > 0 &&
        routineName.length > 0 &&
        repetitions.length > 0 &&
        Number(repetitions) > 0;

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onTaskColorPressHandler = (isChecked, color) => {

        if (color === 'blue') {

            setIsBlueColor(isChecked);
            setIsGreenColor(false);
            setIsRedColor(false);

        } else if (color === 'green') {

            setIsBlueColor(false);
            setIsGreenColor(isChecked);
            setIsRedColor(false);

        } else if (color === 'red') {

            setIsBlueColor(false);
            setIsGreenColor(false);
            setIsRedColor(isChecked);
        }
    };

    const onUpdateTasksPressHandler = () => {

        if (taskName.length === 0 || taskDuration.length === 0) {
            return;
        }

        setTasks((previousState) => {

            const newState = JSON.parse(JSON.stringify(previousState));

            if (taskIndex !== null) {

                const task = newState[taskIndex];

                task.name = taskName;
                task.duration = Number(taskDuration);
                task.color = isBlueColor ?
                    'blue' : isGreenColor ?
                        'green' : isRedColor;

            } else {

                newState.push({
                    name: taskName,
                    duration: taskDuration,
                    color: isBlueColor ?
                        'blue' : isGreenColor ?
                            'green' : isRedColor
                });
            }

            setTaskName('');
            setTaskDuration('');
            setIsBlueColor(true);
            setIsGreenColor(false);
            setIsRedColor(false);

            return newState;
        });
    };

    const onClearTaskPressHandler = () => {

        setTaskName('');
        setTaskDuration('');
        setIsBlueColor(true);
        setIsGreenColor(false);
        setIsRedColor(false);
        setTaskIndex(null);
    };

    const onEditTaskPressHandler = (index) => {

        setTaskIndex(index);
        setTaskName(tasks[index].name);
        setTaskDuration(tasks[index].duration.toString());
        setIsBlueColor(tasks[index].color === 'blue');
        setIsGreenColor(tasks[index].color === 'green');
        setIsRedColor(tasks[index].color === 'red');
    };

    const onDeleteTaskPressHandler = (index) => {

        setTasks((previousState) => {

            const newState = JSON.parse(JSON.stringify(previousState));
            newState.splice(index, 1);
            return newState;
        });
    };

    const onSaveRoutinePressHandler = () => {

        setRoutines((previousState) => {

            const newState = JSON.parse(JSON.stringify(previousState));

            newState.push({
                id: uuid.v4(),
                name: routineName,
                repetitions: Number(repetitions),
                tasks: tasks
            });

            return newState;
        });
    };

    const onCancelEditPressHandler = () => {

        setId(null);
        setIsEditing(false);
    };

    const onDeleteRoutinePressHandler = () => {

        setRoutines((previousState) => {

            const newState = JSON.parse(JSON.stringify(previousState));
            const index = newState.findIndex(record => record.id === id);

            if (index >= 0) {
                newState.splice(index, 1);
            }

            setId(null);
            setIsEditing(false);
            return newState;
        });
    };

    /* ----------------------------------------------------------------------
    FUNCTIONS
    ---------------------------------------------------------------------- */

    const getDisplayableTasks = () => {

        return tasks.map((task, index) => {

            const key = `task-${index}`;

            return <View key={`${key}-container`} style={styles.taskContainer}>

                <View key={`${key}-main-container`} style={styles.taskMainContainer}>

                    <Text key={`${key}-main-container-text`} style={styles.taskMainContainerText} numberOfLines={1} ellipsizeMode='tail'>{task.name}</Text>
                    <View key={`${key}-main-container-color`} style={{
                        height: 10,
                        width: 50,
                        borderRadius: 10,
                        backgroundColor: task.color === 'green' ?
                            '#02c437' : task.color === 'blue' ?
                                'dodgerblue' : '#de0d31'
                    }} />

                </View>

                <View key={`${key}-spacer`} style={{ padding: 5 }} />

                <View key={`${key}-sub-container`} style={styles.taskSubContainer}>

                    <TouchableOpacity key={`${key}-sub-container-edit-button`} style={styles.taskSubContainerButton} onPress={() => onEditTaskPressHandler(index)}>
                        <FeatherIcon key={`${key}-sub-container-edit-button-icon`} size={18} color='#333' name='edit' />
                    </TouchableOpacity>

                    <Text key={`${key}-sub-container-text`} style={styles.taskSubContainerText}>Duration : {task.duration}</Text>

                    <TouchableOpacity key={`${key}-sub-container-delete-button`} style={styles.taskSubContainerButton} onPress={() => onDeleteTaskPressHandler(index)}>
                        <FeatherIcon key={`${key}-sub-container-delete-button-icon`} size={18} color='#333' name='trash' />
                    </TouchableOpacity>

                </View>

                <View key={`${key}-divider`} style={styles.verticalDivider}></View>

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
            flexGrow: 1,
            flexDirection: 'column',
            padding: 20,
        },
        title: {
            fontSize: 30,
            color: '#ebebeb',
        },
        inputContainer: {
            paddingBottom: 20
        },
        inputText: {
            fontSize: 16,
            color: '#ebebeb',
            marginBottom: 5,
        },
        inputTextbox: {
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ebebeb',
            color: '#fff',
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 35,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#fff',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            marginLeft: 10
        },
        disabledButton: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 35,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#fff',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
        },
        disabledButtonText: {
            marginLeft: 10,
            color: '#fff'
        },
        taskContainer: {
            flexDirection: 'column',
        },
        taskMainContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        taskMainContainerText: {
            width: 300,
            fontWeight: 'bold',
            fontSize: 16,
            color: '#dbdbdb',
        },
        taskSubContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        taskSubContainerText: {
            paddingTop: 7,
            fontSize: 16,
            color: '#dbdbdb',
        },
        taskSubContainerButton: {
            paddingHorizontal: 10,
            width: 50,
            height: 35,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#fff',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
        },
        verticalDivider: {
            paddingTop: 20,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#999',
        },
        verticalSpacer: {
            padding: 10
        },
        horizontalSpacer: {
            padding: 10
        }
    });

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.title}>Routine Setup</Text>

            <View style={styles.verticalDivider}></View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Routine Name</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={routineName}
                    onChangeText={setRoutineName}
                    placeholder='Routine Name'
                    placeholderTextColor='#999'
                />

            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Repetitions</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={repetitions}
                    onChangeText={setRepetitions}
                    placeholder='Repetitions'
                    placeholderTextColor='#999'
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Task Name</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={taskName}
                    onChangeText={setTaskName}
                    placeholder='Task Name'
                    placeholderTextColor='#999'
                />
            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Task duration</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={taskDuration}
                    onChangeText={setTaskDuration}
                    placeholder='Duration (In Seconds)'
                    placeholderTextColor='#999'
                    keyboardType='numeric'
                />
            </View>

            <BouncyCheckbox
                size={25}
                fillColor='dodgerblue'
                unFillColor='#ffffff'
                text='Blue Timer'
                isChecked={isBlueColor}
                onPress={(isChecked) => onTaskColorPressHandler(isChecked, 'blue')}
                textStyle={{
                    textDecorationLine: 'none',
                }}
            />

            <View style={{ padding: 5 }} />

            <BouncyCheckbox
                size={25}
                fillColor='#02c437'
                unFillColor='#ffffff'
                text='Green Timer'
                isChecked={isGreenColor}
                onPress={(isChecked) => onTaskColorPressHandler(isChecked, 'green')}
                textStyle={{
                    textDecorationLine: 'none',
                }}
            />

            <View style={{ padding: 5 }} />

            <BouncyCheckbox
                size={25}
                fillColor='#de0d31'
                unFillColor='#ffffff'
                text='Red Timer'
                isChecked={isRedColor}
                onPress={(isChecked) => onTaskColorPressHandler(isChecked, 'red')}
                textStyle={{
                    textDecorationLine: 'none',
                }}
            />

            <View style={styles.verticalSpacer} />

            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={styles.button} onPress={onUpdateTasksPressHandler}>
                    <FeatherIcon size={18} color='#333' name='plus' />
                    <Text style={styles.buttonText}>
                        {taskIndex === null ? 'Add Task' : 'Update Task'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.horizontalSpacer} />

                <TouchableOpacity style={styles.button} onPress={onClearTaskPressHandler}>
                    <MaterialIcon size={18} color='#333' name='clear' /><Text style={styles.buttonText}>Clear Task</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.verticalDivider}></View>

            {getDisplayableTasks()}

            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={validRoutine ? styles.button : styles.disabledButton} onPress={onSaveRoutinePressHandler}>
                    <FeatherIcon size={18} color={validRoutine ? '#333' : '#fff'} name='save' />
                    <Text style={validRoutine ? styles.buttonText : styles.disabledButtonText}>
                        Save Routine
                    </Text>
                </TouchableOpacity>

                <View style={styles.horizontalSpacer}></View>

                <TouchableOpacity style={styles.button} onPress={onCancelEditPressHandler}>
                    <FeatherIcon size={18} color={'#333'} name='slash' />
                    <Text style={styles.buttonText}>
                        {id !== null ? 'Cancel Edit' : 'Cancel Routine'}
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={styles.verticalSpacer} />

            <TouchableOpacity style={id !== null ? styles.button : styles.disabledButton} onPress={onDeleteRoutinePressHandler}>
                <FeatherIcon size={18} color={id !== null ? '#333' : '#fff'} name='trash' />
                <Text style={id !== null ? styles.buttonText : styles.disabledButtonText}>
                    Delete Routine
                </Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} />

        </ScrollView>
    );
};