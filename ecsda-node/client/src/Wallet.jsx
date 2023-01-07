import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, signature, setSignature, error, setError }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    setError('');
    if (signature) {
      // Send a request to the server to verify the signature and send funds
      try {
        const { data } = await server.post('/send-funds', { signature });
        const { address, balance } = data;
        setAddress(address);
        setBalance(balance);
      } catch (err) {
        console.error(err);
        setError(err.response.data.message);
      }
    } else {
      setAddress('');
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      {error && <div className="error">{error}</div>}

      <label>
        Signature
        <input placeholder="type a signature" value={signature} onChange={onChange}></input>
      </label>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} disabled></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;