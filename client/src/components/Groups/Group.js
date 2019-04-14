import React, {component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Member from '../Member'


export default class Group extends React.Component {

    state = {
        members: []
    }
    
    constructor(){
        super();
        this.getMembers();
    }

    getMembers = async() => {
        const response = await fetch('/members', {
            method: 'GET',
          });
        this.setState({members: await response.json()})
        console.log(this.state.members);
    }

    render(){
        return(
            <div>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.group.name}
                            </Typography>
                            <ul>
                            { this.state.members.map( member => (
                                    <Member member={member} />
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
            </div>
        );
    }
}