import * as React from "react";
import Template from "./Template";
import { Card, Image, Icon } from "semantic-ui-react";
import imageUrl from "./img/avatar/large/matthew.png";

const CardSample = (props) => {
    return (
        <Template {...props}>
            <Card>
                <Image src={imageUrl} />
                <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
                </Card.Content>
            </Card>  
        </Template>
    );
};

export {
    CardSample,
    CardSample as default
}