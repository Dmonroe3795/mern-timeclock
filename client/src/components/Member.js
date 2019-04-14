import React, {component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Member = (props) => {
    console.log(props.member);

    return(
        <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.member.name}
                        </Typography>
                        <Typography component="p">
                            Hours: {props.member.totalHours}
                        </Typography>
                    </CardContent>
                </Card>
        </div>
    );
}

export default Member;