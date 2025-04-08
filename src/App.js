import React, { useState, useEffect } from 'react';
import { TabView } from 'react-native-tab-view';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    useWindowDimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Routines from './tabs/Routines/Routines';
import Timer from './tabs/Timer/Timer';

export default function App() {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const [routines, setRoutines] = useState([]);

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

    const getRoutines = async () => {

        try {

            const routines = await AsyncStorage.getItem('routines');

            if (routines !== null) {
                setRoutines(JSON.parse(routines));
            }

        } catch (error) {
            console.error(error);
        }
    };

    /* ----------------------------------------------------------------------
    USE-EFFECTS
    ---------------------------------------------------------------------- */

    useEffect(() => {

        getRoutines();

    }, []);

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

