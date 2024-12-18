import useStore from "../../../app/store";

export default function GetLocal() {
  const getLocal = useStore((state) => state.getLocal);
  const local = useStore((state) => state.local);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const handleGetLocal = async () => {
    await getLocal();
  };

  return (
    <div>
      <button onClick={handleGetLocal}>Get All Local Transport</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {local && (
        <>
          {Array.isArray(local.result) ? (
            <ul>
              {local.result.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : (
            <pre>{JSON.stringify(local, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}
