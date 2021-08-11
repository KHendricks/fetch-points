import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";

function App() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-around" m={7}>
        <TextField label="Payer" />
        <TextField label="Points" />
        <TextField label="Date" />
      </Box>
      <Box display="flex" justifyContent="center" m={7}>
        <Button variant="contained">Add a Transaction</Button>
      </Box>

      <Divider></Divider>

      <Box display="flex" justifyContent="space-around" m={7}>
        <TextField label="Points" />
      </Box>
      <Box display="flex" justifyContent="center" m={7}>
        <Button variant="contained">Spend Points</Button>
      </Box>

      <Divider></Divider>

      <Box display="flex" justifyContent="center" m={7}>
        <Button variant="contained">Get Balances</Button>
      </Box>
    </Box>
  );
}

export default App;
