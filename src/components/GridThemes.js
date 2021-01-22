import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { setSubTab } from '../actions/nav';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    root: {
          padding: theme.spacing(2),
    },
    rootRow: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          overflowY: 'hidden',
          overflowX: 'scroll',
    },
    gridList: {
        marginRight: theme.spacing(1),
    },
    gridListRow: {
        flexWrap: 'nowrap',
    },
    paper: {
        background: '#e6e6e6',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(230, 230, 230, .3)',
    },
    cardClass: {
        height: "100%",
        width: "100%"
    },
    cardClassRow: {
        height: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.primary.main
    },
    box: {
        height: '25vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    subtitleCreator: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: 'white'
    },
    gridInfo: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    themeIcon: {
        color: "white"
    },
    title: {
        fontWeight: 'bold',
        paddingBottom: theme.spacing(2),
        color: 'white'
    },
    titleSection: {
        fontWeight: 'bold',
    },
    badge: {
        color: "white"
    }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width="100%">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class GridThemes extends Component {
  constructor(props){
      super(props);
      this.state = {
          open: false,
          tracks: [],
          album: null,
          cover: null,
          disabled: false,
      };
  }

  handleChange = (event, newValue) => {
      this.props.setSubTab(newValue)
  }

  render(){
      const { classes } = this.props;
      return (
          <React.Fragment>
                {!this.props.row ? <Paper square className={classes.paper}>
                  <Tabs
                    value={this.props.subTab}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                  >
                    {Object.keys(this.props.themeLists).map((item, i) => (
                    <Tab key={item}
                        label={this.props.themeLists[item] === undefined ? item + ' (0)' : item + ' (' + this.props.themeLists[item].length + ')'}
                             {...a11yProps({i})} />
                     ))}
                  </Tabs>
              </Paper> :
              <Typography
                  variant={Object.keys(this.props.themeLists)[0] === 'Themes' ? 'h5' : 'h4'}
                  color="primary"
                  component="h1"
                  align="left" 
                  className={classes.titleSection}
              >
                {Object.keys(this.props.themeLists)[0]}
                {Object.keys(this.props.themeLists)[0] === 'Themes' ? ('(' + this.props.themeLists[Object.keys(this.props.themeLists)[0]].length + ')') : ''}
            </Typography>}
                {this.props.loading && <Container className={classes.box}>
                <CircularProgress color="secondary" />
            </Container>}
            {!this.props.loading && Object.keys(this.props.themeLists).map((item, i) => (
                <TabPanel value={this.props.subTab} className={this.props.row ? classes.rootRow : classes.root} index={i} key={item}>
                    <Grid container direction="row" className={this.props.row ? classes.gridListRow : classes.gridList} spacing={2}>
                       {item in this.props.themeLists && this.props.themeLists[item] && this.props.themeLists[item].map(elem => (
                                 <Grid item xs={12} sm={6} md={6} key={elem._id} className={classes.gridItem}>
                                     <Card className={this.props.row ? classes.cardClassRow : classes.cardClass}>
                                         <CardActionArea
                                             component={Link}
                                             to={{
                                                pathname: `/theme/${elem._id}`,
                                                theme: this.props.loadThemeOnClick ? null : elem,
                                            }}
                                            disableRipple={this.state.disabled}
                                         >
                                           <CardContent className={classes.content}>
                                               <div className={classes.titleContainer}>
                                                   <Typography noWrap variant="subtitle1" component="h1" align="left" className={classes.title}>
                                                     {elem.title}
                                                   </Typography>
                                               </div>
                                                <Grid container justify="flex-end" alignItems="center" direction="row" className={classes.gridInfo}>
                                                    <Grid container justify="flex-start" alignItems="center" direction="row">
                                                        <Typography variant="subtitle1" className={classes.subtitleCreator}>
                                                          by {elem.creator.username}
                                                        </Typography>
                                                        <Avatar
                                                           alt={elem.creator.username}
                                                           src={elem.creator.avatar}
                                                           title={elem.creator.username}
                                                           aria-label="open account menu"
                                                           className={classes.avatar}
                                                         >
                                                       </Avatar>
                                                   </Grid>
                                                   <Badge color="secondary" badgeContent={elem.playlists.length} showZero classes={{ badge: classes.badge}} >
                                                       <QueueMusicIcon fontSize="large" className={classes.themeIcon}/>
                                                   </Badge>
                                               </Grid>
                                           </CardContent>
                                        </CardActionArea>
                                     </Card>
                                  </Grid>
                             ))}
                   </Grid>
             </TabPanel>)
             )}
    </React.Fragment>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setSubTab: (value) => dispatch(setSubTab(value))
  };
}

function mapStateToProps(state, props) {
  return {
    addLoading: state.player.addLoading,
    itemAddedId: state.player.itemAddedId,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.session !== null ? state.auth.session.accessToken.jwtToken: null,
    userid: state.auth.session !== null ? state.auth.session.accessToken.payload.sub: null,
    currentTrack: state.player.currentTrack ? state.player.currentTrack : '',
    subTab: state.nav.subTab ? state.nav.subTab : 0,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(GridThemes)));