---
slug: react-custom-hooks
title: React自定义hooks
authors: jonas
tags: [React, React hooks]
---

## 为什么需要自定义hooks

1. 在创建工具类的时候，我们可能遇到需要在工具类中创建调用一些其他的hooks。但是由于使用的是常规JavaScript创建的工具类，此时便会出现Invalid hook call的错误。这是因为React hooks只能在React Component或另一个hook中被调用。
2. 在React Component中，页面有许多逻辑代码包含多个hook。因为在最开始我们知道hooks只能在hooks被调用，所有我们这时最好的办法便是创建一个hook用来抽离这些逻辑代码。这是一段常见代码：

```tsx
// react component
const TestPage = () => {
  const [data, setDate] = useState();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (params) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(params);
      setDate(res.data);
    } catch (e) {
      setError(e.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();

    return () => {
      setLoading(false);
      setError("");
      setDate();
    };
  }, []);

  const handler = (params) => {
    fetchData(params);
  };
  return (
    <div>
      {data}
      <button onClick={handler}></button>
    </div>
  );
};
```

我们可以对这个React component进行简单的抽离：

```tsx
// customize hook -- useFetchData
const useFetchData = () => {
  const [data, setDate] = useState();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (params) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(params);
      setDate(res.data);
    } catch (e) {
      setError(e.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();

    return () => {
      setLoading(false);
      setError("");
      setDate();
    };
  }, []);

  const handler = (params) => {
    fetchData(params);
  };
  return { data, error, loading, handler };
};
```

在React component中调用这个hook

```tsx
// react component
const TestPage = () => {
  const { data, error, loading, handler } = useFetchData();
  return (
    <div>
      {data}
      <button onClick={handler}></button>
    </div>
  );
};
```

通过这种方式我们可以将React项目中的逻辑代码提取出来，或者就是当前component/hook逻辑复杂，代码量大，不便于理解，可以复用。我们都可以进行抽取。

## 创建规则

### 命名

hook必须以小写字母开头，use后跟大写字母逻辑
例如useOnLineStatus。当此函数不调用任何hooks（此时就是普通函数），避免使用use前缀。

理想情况下自定义hook，名称需要清晰。通过名字能猜出作用,并知道入参和返回值。因为当你无法选择一个清晰的名称意味着你的组建过于耦合，并未进行提取。

### 共享状态逻辑

自定义hook允许共享状态逻辑，但不能共享状态本身。 对于hook的每次调用都完全独立于对同一hook的所有其他调用。

```tsx
import { useFormInput } from "./useFormInput.js";

export default function Form() {
  const firstNameProps = useFormInput("Mary");
  const lastNameProps = useFormInput("Poppins");

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning, {firstNameProps.value} {lastNameProps.value}.
        </b>
      </p>
    </>
  );
}
```

```tsx
import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
```

### hook之间传递reactive values

自定义hook的代码将在每次重新渲染组建期间运行。需要像函数一样，自定义hook需要保证纯粹。

```tsx
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on("message", (msg) => {
      showNotification("New message: " + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

```tsx
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
  });

  return (
    <>
      <label>
        Server URL:
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

### 传递handler到自定义hook

```tsx
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification("New message: " + msg);
    },
  });

  return (
    <>
      <label>
        Server URL:
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

```tsx
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on("message", (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```
