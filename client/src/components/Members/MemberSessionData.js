import React, {component} from 'react';
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
import PersonIcon from '@material-ui/icons/Person';
import HoursIcon from '@material-ui/icons/Timer'

const styles = theme => ({
    inset: {
      marginLeft: 10
    },
  });

class Member extends React.Component{

    state = {
        mobileOpen: false,
        open:false,
        session: []
    };

    constructor(){
        super();
    }

    loadData() {
        fetch(`/sessions/${this.props.session}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
            this.setState({ session: data });
        })
        .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
      }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render(){
        const { classes, theme, children} = this.props;
        const { timeIn, timeOut, partner, duration } = this.state.session;
        return(
            <div>
    
    <List component="nav">
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={partner} />
                        <ListItemText align="right" inset primary={`${duration} hrs`}/>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem className={classes.inset} button>
                            <ListItemIcon>
                                <HoursIcon />
                            </ListItemIcon>
                            <ListItemText inset primary={`${timeIn}-${timeOut}`} />
                        </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(Member);