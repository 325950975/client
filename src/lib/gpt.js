// 以下函数是实现chatgpi 接口调用

export async function chat(ChatMessage, apiKey) {
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "post",
        // signal: AbortSignal.timeout(8000),
        // 开启后到达设定时间会中断流式输出
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: messageList,
        }),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  