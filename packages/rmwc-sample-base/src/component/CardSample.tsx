import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "rmwc/Card";
import { Typography } from "rmwc/Typography";

class CardSample extends React.Component<any, any> {
    render() {
         return (
             <Card style={{width: '21rem'}}>
              <CardPrimaryAction>
                <CardMedia sixteenByNine style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}}/>
                <div style={{padding: '0 1rem 1rem 1rem'}}>
                  <Typography use="title" tag="h2">Our Changing Planet</Typography>
                  <Typography
                    use="subheading1"
                    tag="h3"
                    theme="text-secondary-on-background"
                    style={{marginTop: '-1rem'}}
                  >
                    by Kurt Wagner
                  </Typography>
                  <Typography use="body1" tag="div" theme="text-secondary-on-background">Visit ten places on our planet that are undergoing the biggest changes today.</Typography>
                </div>
              </CardPrimaryAction>
              <CardActions>
                <CardActionButtons>
                  <CardAction>Read</CardAction>
                  <CardAction>Bookmark</CardAction>
                </CardActionButtons>
                <CardActionIcons>
                  <CardAction
                    iconToggle
                    on={{label: 'Remove from favorites', content: 'favorite'}}
                    off={{label: 'Add to favorites', content: 'favorite_border'}}
                  />
                  <CardAction icon use="share" />
                  <CardAction icon use="more_vert" />
                </CardActionIcons>
              </CardActions>
            </Card>
        );
    }    
}

class MiniCardSample extends React.Component<any, any> {
  render() {
    return (
      <Card style={{width: '12.5rem'}}>
      <CardPrimaryAction>
        <CardMedia square style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/1-1.jpg)'}}>
          <CardMediaContent>
            <Typography
              use="subheading2"
              tag="div"
              theme="text-primary-on-dark"
              style={{
                padding: '0.5rem 1rem',
                backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                bottom: '0',
                left: '0',
                right: '0',
                position: 'absolute'
              }}
            >
              Vacation Photos
            </Typography>
          </CardMediaContent>
        </CardMedia>
      </CardPrimaryAction>
      <CardActions>
        <CardActionIcons>
          <CardAction
            iconToggle
            on={{label: 'Remove from favorites', content: 'favorite'}}
            off={{label: 'Add to favorites', content: 'favorite_border'}}
          />
          <CardAction icon use="bookmark_border"/>
          <CardAction icon use="share"/>
        </CardActionIcons>
      </CardActions>
    </Card>
    );
  }
}

export { CardSample, MiniCardSample }