import * as React from "react";
import Template from "./Template";
import { Card, Image, Icon, Feed, Grid, Segment } from "semantic-ui-react";
import matthewLargeImage from "./img/avatar/large/matthew.png";
import jennySmallImage from "./img/avatar/small/jenny.jpg";
import mollySmallImage from "./img/avatar/small/molly.png";
import elliotSmallImage from "./img/avatar/small/elliot.jpg";

const CardSample = (props) => {
    return (
        <Template {...props}>
            <Grid stackable columns="2">
                <Grid.Column>
                    
                    <Card>
                        <Image src={matthewLargeImage} />
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
                    
                </Grid.Column>
                <Grid.Column>
                    
                    <Card>
                        <Card.Content>
                        <Card.Header>Recent Activity</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Feed>
                            <Feed.Event>
                            <Feed.Label image={jennySmallImage} />
                            <Feed.Content>
                                <Feed.Date content='1 day ago' />
                                <Feed.Summary>
                                You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                                </Feed.Summary>
                            </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                            <Feed.Label image={mollySmallImage} />
                            <Feed.Content>
                                <Feed.Date content='3 days ago' />
                                <Feed.Summary>
                                You added <a>Molly Malone</a> as a friend.
                                </Feed.Summary>
                            </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                            <Feed.Label image={elliotSmallImage} />
                            <Feed.Content>
                                <Feed.Date content='4 days ago' />
                                <Feed.Summary>
                                You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                                </Feed.Summary>
                            </Feed.Content>
                            </Feed.Event>
                        </Feed>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Template>
    );
};

export {
    CardSample,
    CardSample as default
}