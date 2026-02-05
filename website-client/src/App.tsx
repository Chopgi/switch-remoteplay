import blue from '@material-ui/core/colors/blue'
import CssBaseline from '@material-ui/core/CssBaseline'
import {createStyles, Theme, ThemeProvider, WithStyles, withStyles} from '@material-ui/core/styles'
import {createTheme} from "@material-ui/core"
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'typeface-roboto'
import './App.css'
import CustomAppBar from './AppBar'
import PlayGame from './components/PlayGame'

// In MUI v4, the function is actually createMuiTheme
// (createTheme was introduced in v5, though aliased in late v4 versions)
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: blue,
    },
})

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    app: {
        marginTop: '10px',
    }
})

// Define the Props interface to include WithStyles
type Props = WithStyles<typeof styles>

class App extends React.Component<Props> {
    render(): React.ReactNode {
        const {classes} = this.props

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <div className={classes.root}>
                        <CustomAppBar/>
                        <div className={classes.app}>
                            <Routes>
                                <Route path="/" element={<PlayGame/>}/>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles)(App)