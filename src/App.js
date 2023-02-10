import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CollectionCreateForm from './ModalBuku';
import { Button, Modal, Form } from 'antd';


import { menu } from "./menu";
import { hasChildren } from "./utils";

export default function App() {
  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <ListItem button>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const test = () =>{
    alert();
  }
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Modal Example</h1>
      <ListItem button >
        <ListItemText primary={item.title} />
        <Button
        type="primary"
        onClick={() => {
          test();
          

        }}
      >
        plus
      </Button>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        id="1"
        onCancel={() => {
          setVisible(true);
          

        }}
      />
    </div>
  );
};
