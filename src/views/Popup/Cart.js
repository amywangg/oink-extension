import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Container,
  Box,
  Button,
  Divider,
  Typography,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { saveProducts, savePurchase, getBudget } from "../../redux/api";

export function Cart({ user, items, totalPrice }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1.5),
    },
    divider: {
      background: theme.palette.secondary,
    },
  }));
  const classes = useStyles();

  const [budget, setBudget] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      let budget = await getBudget(user);
      setBudget(budget.budget);
    }, 2000);
  }, [saved]);

  const onSaveClick = async () => {
    let purchase_id = await savePurchase(user, totalPrice);
    console.log(purchase_id);

    //   items.forEach(async (item) => {
    //     await saveProducts(item, user, purchase_id);
    //   });
    await saveProducts(items, user, purchase_id);

    setSaved(true);
  };

  return (
    <div>
      <Container style={{ marginTop: 10 }}>
        <Grid container>
          <Grid
            item
            xs={4}
            alignItems="flex-start"
            style={{
              borderBottom: "2px solid #FFAEC8",
            }}
          >
            <Typography variant="body1">My Cart</Typography>
          </Grid>
          <Grid
            style={{ marginTop: 5, position: "absolute", right: 25 }}
            item
            xs={8}
          >
            Balance: <strong>CAD {budget}</strong>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            marginTop: 10,
            height: 200,
            overflow: "scroll",
            marginBottom: 5,
          }}
          spacing={2}
        >
          {items.map((item) => {
            return (
              <Grid container alignItems="flex-start" item xs={12}>
                <Grid item xs={8}>
                  {item.name}
                </Grid>
                <Grid alignItems="flex-end" item xs={4}>
                  CAD: {item.price}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid container style={{ marginTop: 10, height: 50 }}>
          <Grid
            style={{ marginTop: 5, position: "absolute", right: 15 }}
            item
            xs={12}
          >
            Subtotal: <strong>CAD {totalPrice}</strong>
          </Grid>
          <Grid
            style={{ marginTop: 25, position: "absolute", right: 15 }}
            item
            xs={12}
          >
            Balance After Purchase: <strong>CAD {budget - totalPrice}</strong>
          </Grid>
        </Grid>

        <Divider />

        <Grid container style={{ marginTop: 10, height: 100 }}>
          <Grid alignItems="flex-start" item xs={4}>
            <Typography
              style={{ borderBottom: "2px solid #FFAEC8" }}
              variant="body1"
            >
              This Month
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              style={{ position: "absolute", right: 25, marginTop: -20 }}
              item
              xs={12}
            >
              <strong>
                CAD {totalPrice} / CAD {budget}
              </strong>
            </Grid>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  value={(totalPrice / budget) * 100}
                />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="#FF3576">{`${Math.round(
                  budget !== 0 ? (totalPrice / budget) * 100 : 0
                )}%`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Grid container>
        <Grid item style={{ left: 15, position: "absolute" }} xs={6}>
          <a
            target="_blank"
            style={{ color: "#353434" }}
            href="https://oink-dashboard.herokuapp.com/"
          >
            <p style={{ color: "#353434" }}>View in Dashboard</p>
          </a>
        </Grid>
        <Grid
          item
          style={{ marginTop: 5, right: 25, position: "absolute" }}
          xs={6}
        >
          {saved ? (
            <Typography
              style={{ marginTop: 5 }}
              variant="body2"
              color="#FF3576"
            >
              Success
            </Typography>
          ) : (
            <Button variant="small" onClick={onSaveClick}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  saveProducts: (items, user, purchase_id) =>
    dispatch(saveProducts(items, user, purchase_id)),
  savePurchase: (user, total_amount) =>
    dispatch(savePurchase(user, total_amount)),
  getBudget: (user) => dispatch(getBudget(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
