import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import List from './List/List';
import Routine from './Routine/Routine';

export default function Routines(props) {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const {
        routines,
        setRoutines,

        setRoutine,

        setTabIndex
    } = props;

    const [id, setId] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    /* ----------------------------------------------------------------------
    HANDLERS
    ---------------------------------------------------------------------- */

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
        tab: {
            flex: 1,
            flexDirection: 'column'
        }
    });

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <View style={styles.tab}>

            {!isEditing &&
                <List
                    routines={routines}
                    setRoutines={setRoutines}

                    setRoutine={setRoutine}

                    setTabIndex={setTabIndex}

                    setId={setId}

                    setIsEditing={setIsEditing}
                />
            }

            {isEditing && 
                <Routine
                    id={id}
                    setId={setId}
                    
                    setRoutines={setRoutines}
                    setIsEditing={setIsEditing}
                />
            }

        </View>
    );
};