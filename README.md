# ETH-BootCamp_week1_exercise
Week 1 Assignment for the Ethereum Bootcamp

## Goal/Functionality

To Successfully transfer balances between accounts without having to pass the private key;

The "useState" hook is used by this code to control the state of the "App" React component.

The component renders a "Wallet" component and a "Transfer" component, supplying the Wallet component props like "balance," "address," "signature," and "error."

The "onChange" function of the Wallet component is activated whenever the user inserts "signature" into the input field. This function sends a request to a server to check the signature and deliver money.

Based on the server's answer, it modifies the component's "address," "balance," and "error" states.

The component also shows the balance of the Wallet as well as any faults that occurred during the request.
