import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { useState } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Routine(props) {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const {
        id,
        setId,

        setRoutines,
        setIsEditing
    } = props;

    const [name, setName] = useState('');
    const [repetitions, setRepetitions] = useState(1);

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

    const onRepetitionsChangeHandler = (text) => {
        setRepetitions(Number(text));
    };

    const onCandlePressHandler = () => {

        setId(null);
        setIsEditing(false);
    };

    /* ----------------------------------------------------------------------
    FUNCTIONS
    ---------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------
    USE-EFFECTS
    ---------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------
    CSS STYLES
    ---------------------------------------------------------------------- */

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            padding: 20,
        },
        inputContainer: {
            marginTop: 20
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
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
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
        },
    });

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Routine Name :</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={name}
                    onChangeText={setName}
                    placeholder='Routine Name'
                    placeholderTextColor='#999'
                />
            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Repetitions :</Text>

                <TextInput
                    style={styles.inputTextbox}
                    value={repetitions}
                    onChangeText={onRepetitionsChangeHandler}
                    placeholder='Repetitions'
                    placeholderTextColor='#999'
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.footerContainer}>

                <TouchableOpacity style={styles.footerButton} onPress={onCandlePressHandler}>
                    <FeatherIcon size={18} color='#333' name='slash' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerButton} onPress={null}>
                    <FeatherIcon size={18} color='#333' name='save' />
                </TouchableOpacity>

            </View>

        </View>
    );
};