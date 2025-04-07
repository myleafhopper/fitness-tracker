import React, { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useWindowDimensions
} from 'react-native';

import Routines from './tabs/Routines/Routines';
import Timer from './tabs/Timer/Timer';

export default function App() {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const [routines, setRoutines] = useState([
        {
            id: '00000000-0000-0000-0000-000000000000',
            name: 'Standard Workout 1',
            repetitions: 1,
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
        },
        {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Standard Workout 2',
            repetitions: 1,
            tasks: [
                {
                    index: 0,
                    name: 'Wait',
                    duration: 5,
                    color: 'green'
                },
                {
                    index: 1,
                    name: 'Push Ups',
                    duration: 10,
                    color: 'red'
                }
            ]
        }
    ]);

    const [routine, setRoutine] = useState(null);

    /* ----------------------------------------------------------------------
    TABS
    ---------------------------------------------------------------------- */

    const layout = useWindowDimensions();
    const [tabIndex, setTabIndex] = React.useState(0);

    const routes = [
        { key: 'routines', title: 'Routines' },
        { key: 'timer', title: 'Timer' }
    ];

    const renderScene = ({ route }) => {

        switch (route.key) {

            case 'routines':

                return <Routines
                    routines={routines}
                    setRoutines={setRoutines}

                    setRoutine={setRoutine}

                    setTabIndex={setTabIndex}
                />;

            case 'timer':

                return <Timer
                    routine={routine}
                />;

            default:

                return null;
        }
    };

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
        root: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#07121B'
        }
    });

    /* ----------------------------------------------------------------------
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <SafeAreaView style={styles.root}>

            <StatusBar barStyle='light-content' />

            <TabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
                initialLayout={{ width: layout.width }}
            />

        </SafeAreaView>
    );
};

