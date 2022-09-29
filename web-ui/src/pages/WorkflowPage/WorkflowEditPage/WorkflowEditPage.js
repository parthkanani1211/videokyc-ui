import React, { useEffect, useState, useCallback } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Loadable } from '../../../common';
import { renderErrorMessage } from '../../../util/error';
import { Col, Row } from 'reactstrap';

import {
  Input, Button, makeStyles, TextField, FormControl, Select,
  InputLabel, MenuItem, Card, CardHeader, CardContent, CardActions,
  List, ListItem, ListItemText, Collapse, ListItemIcon
} from "@material-ui/core";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import './WorkflowEditPage.scss';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  nested: {
    paddingTop: 0,
    margin: 0,
    cursor: 'pointer',
    paddingLeft: theme.spacing(4),
  },
  itemText: {
    margin: 0,
    padding: 0,
  }
}));

export default function WorkflowEditPage(props) {
  const { mode, aiBlocks, actions: { aiBlocksList } } = props;

  const isEdit = mode === 'edit';
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [values, setValues] = React.useState({});

  const handleCallback = () => {
    let initialState = {};
    aiBlocks.forEach(block => {
      initialState = {
        ...initialState,
        [`open-${block.name}`]: true,
      }
    });

    setValues(initialState);
  }

  useEffect(() => {
    aiBlocksList(handleCallback);
  }, [aiBlocksList]);

  const onDragStart = (ev, category, blockId) => {
    ev.dataTransfer.setData("category", category);
    ev.dataTransfer.setData("blockId", blockId);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  function handleClick(category) {
    setValues(prevState => ({
      ...prevState,
      [`open-${category}`]: !values[`open-${category}`],
    }));
  }

  const onDrop = (ev) => {
    const blockId = ev.dataTransfer.getData("blockId");
    const category = ev.dataTransfer.getData("category");

    const botCategory = aiBlocks.find(x => x.name === category);
    const block = botCategory.blocks.find(x => x.id === parseInt(blockId));

    setTasks(prevState => [...prevState, block]);
  }

  return (
    <Loadable loading={false}>
      <Card>
        <CardHeader
          title={!isEdit ? "Create Workflow" : "Edit Workflow"}
          action={
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/workflows"
                variant="contained"
                color="default"
                className={classes.button}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Save Workflow
              </Button>
            </CardActions>
          }
        />
        <CardContent>
          <div className="workflow-edit-page">
            <div className="row">
              <div className="col-md-3">
                <List
                  component="nav"
                >
                  {aiBlocks && aiBlocks.map((aiblock, index) => (
                    <>
                      <ListItem
                        button
                        onClick={() => handleClick(aiblock.name)}
                        key={index}
                      >
                        <ListItemText>{aiblock.name}</ListItemText>
                        {values[`open-${aiblock.name}`] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={values[`open-${aiblock.name}`]} timeout="auto" unmountOnExit>
                        {aiblock.blocks.map(({ id, name }) => (
                          <List key={id} component="div" disablePadding>
                            <ListItem
                              draggable
                              onDragStart={(e) => onDragStart(e, aiblock.name, id)}
                              className={classes.nested}>
                              <ListItemText
                                className={classes.itemText}
                                primary={name} />
                            </ListItem>
                          </List>
                        ))}
                      </Collapse>
                    </>
                  ))}
                </List>

              </div>
              <div className="col-md-9">
                <div
                  className="workflow"
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => onDrop(e)}
                >
                  {tasks.map(({ id, name }) => (
                    <div
                      className="ai-block"
                      draggable
                      key={id}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Loadable>
  );
}