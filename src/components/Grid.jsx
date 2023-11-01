import Card from "./Card.jsx";

export default function Grid() {
  return (
    <div className="grid">
      <h1>Grid</h1>
      <table>
        <tr>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
        </tr>
        <tr>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
        </tr>
        <tr>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
        </tr>
        <tr>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
          <td>
            <Card />
          </td>
        </tr>
      </table>
    </div>
  );
}
