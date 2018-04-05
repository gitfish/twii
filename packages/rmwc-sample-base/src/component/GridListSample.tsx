import * as React from "react";
import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from "rmwc/GridList";

import { Checkbox } from "rmwc/Checkbox";
import { Select } from "rmwc/Select";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";

class GridListSample extends React.Component<any, any> {
    render() {
        return (
            <div>
                <GridList
                  tileGutter1={this.state.tileGutter1}
                  headerCaption={this.state.headerCaption}
                  twolineCaption={this.state.twolineCaption}
                  withIconAlignStart={this.state.withIconAlignStart}
                  tileAspect={this.state.tileAspect}
                >
                  {[...Array(8)].map((val, i) => (
                    <GridTile key={i}>
                      <GridTilePrimary>
                        <GridTilePrimaryContent>
                          <img src="https://material-components-web.appspot.com/images/1-1.jpg" alt="test" />
                        </GridTilePrimaryContent>
                      </GridTilePrimary>
                      <GridTileSecondary>
                        <GridTileIcon>info</GridTileIcon>
                        <GridTileTitle>Tile {i + 1}</GridTileTitle>
                      </GridTileSecondary>
                    </GridTile>
                  ))}
                </GridList>
                
                <Checkbox label="tileGutter1" onClick={() => this.setState({tileGutter1: !this.state.tileGutter1})}/>
                <Checkbox label="headerCaption" onClick={() => this.setState({headerCaption: !this.state.headerCaption})}/>
                <Checkbox label="twolineCaption" onClick={() => this.setState({twolineCaption: !this.state.twolineCaption})}/>
                <Checkbox label="withIconAlignStart" onClick={() => this.setState({withIconAlignStart: !this.state.withIconAlignStart})}/>
                
                <Select
                  value={this.state.tileAspect || '1x1'}
                  onChange={evt => this.setState({tileAspect: evt.target.value})}
                  label="tileAspect"
                  options={['1x1', '16x9', '2x3', '3x2', '4x3', '3x4']}
                />
            </div>
        );
    }
}

export { GridListSample }

