import * as React from 'react';
import { TabView } from 'react-native-tab-view';
import { 
    StyleSheet, 
    SafeAreaView, 
    StatusBar, 
    useWindowDimensions
} from 'react-native';

import Routines from './tabs/Routines';
import Timer from './tabs/Timer';

export default function App() {

    /* ----------------------------------------------------------------------
    STATES & VARIABLES
    ---------------------------------------------------------------------- */

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    // ----------------------------------------------------------------------

    const duration = 15;
    
    // ----------------------------------------------------------------------

    const routes = [
        { key: 'routines', title: 'Routines' },
        { key: 'timer', title: 'Timer' },
        // { key: 'charts', title: 'Charts' }
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'routines':

                return <Routines />;

            case 'timer':

                return <Timer
                    duration={duration}
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
    RENDER
    ---------------------------------------------------------------------- */

    return (
        <SafeAreaView style={styles.root}>

            <StatusBar barStyle='light-content' />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
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