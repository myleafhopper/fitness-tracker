import * as React from 'react';
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

    const layout = useWindowDimensions();
    const [tabIndex, setTabIndex] = React.useState(0);

    // ----------------------------------------------------------------------

    const routes = [
        { key: 'routines', title: 'Routines' },
        { key: 'timer', title: 'Timer' }
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'routines':

                return <Routines
                    setTabIndex={setTabIndex}
                />;

            case 'timer':

                return <Timer />;

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