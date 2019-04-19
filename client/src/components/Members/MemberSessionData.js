import React, { component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import PartnerIcon from '@material-ui/icons/Business';
import HoursIcon from '@material-ui/icons/Timer'

const styles = theme => ({
    inset: {
        marginLeft: 10
    },
});

class Member extends React.Component {

    state = {
        mobileOpen: false,
        open: false,
        session: [],
        duration: 0,
        partner: ""
    };

    constructor() {
        super();
    }

    formatTime(iso) {
        let date = new Date(iso)
        return date.toLocaleTimeString('en-US')
    }

    // loadData() {
    //     const session = {};
    //     fetch(`/sessions/${this.props.session}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ session: data });
    //             this.setState({ duration: this.state.session.duration.toFixed(2) })
    //             fetch(`/partners/${this.state.session.partner}`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     this.setState({ partner: data.name });
    //                 })
    //                 .catch(err => console.error(this.props.url, err.toString()))
    //         })
    // }

    componentDidMount() {
        console.log(this.props.partner)
        //this.loadData()
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes, theme, children } = this.props;
        const { timeIn, timeOut, duration, partner } = this.props.session;
        return (
            <div>
                <List component="nav">
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon style={{ paddingLeft: 20 }}>
                            <PartnerIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={partner.name} />
                        <ListItemText align="right" inset primary={`${duration} hrs`} />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.inset} button>
                                <ListItemIcon style={{ paddingLeft: 15 }}>
                                    <HoursIcon />
                                </ListItemIcon>
                                <ListItemText inset primary={`${this.formatTime(timeIn)} - ${this.formatTime(timeOut)}`} />
                            </ListItem>
                        </List>
                    </Collapse>

                </List>
            </div >
        );
    }
}

export default withStyles(styles)(Member);