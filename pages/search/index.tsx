import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search, ArrowBack } from "@mui/icons-material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-4">
      <IconButton
        onClick={handleClickOpen}
        size="large"
        aria-label="search"
        color="inherit"
      >
        <Search />
      </IconButton>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "sticky" }}>
            <Toolbar sx={{ backgroundColor: "green" }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBack />
              </IconButton>
              <InputBase
                type="search"
                sx={{
                  ml: 1,
                  mr: 1,
                  flex: 1,
                  ".MuiInputBase-input": {
                    borderRadius: "32px",
                    fontSize: '14px'
                  },
                }}
                placeholder="Nhập thông tin tìm kiếm"
                inputProps={{ "aria-label": "Nhập thông tin tìm kiếm" }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#fff" }}
                aria-label="search"
              >
                <Search onClick={handleClose} aria-label="search" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List sx={{ p: 0 }}>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Phone ringtone" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText
                primary="Default notification ringtone"
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchC;
