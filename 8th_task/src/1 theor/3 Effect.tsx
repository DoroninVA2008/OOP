useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    // Указываем тип ожидаемых данных
    const data: MyDataType = await response.json();
    setState(data);
  };
  fetchData();
}, []);