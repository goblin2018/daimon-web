import { Button } from 'antd'
import { addProject } from 'api/project'
import { getWsUrl } from 'api/ws'
import { useEffect, useState } from 'react'

// const socket
function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const [data, setData] = useState('')
  const [pData, setPData] = useState('')

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])

  useEffect(() => {
    if (socket) {
      console.log('invoke socket ')

      socket.onopen = (ev) => {
        console.log('on open ', ev)
        socket.send('connect ok')
      }
      socket.onmessage = (ev) => {
        console.log(ev.data)
        setData(ev.data)
      }
      socket.addEventListener('close', (ev) => {
        console.log('on close', ev)
      })
      socket.addEventListener('error', (ev) => {
        console.log(ev)
      })
    }
  }, [socket])

  return (
    <div className="mx-auto w-[1200px] py-6">
      <div className="m-4 bg-slate-100 p-4">
        <div className="text-3xl mb-2">WebSocket 接口</div>
        <div className="py-4">URL: ws://120.79.169.245/ws/v1/connect</div>

        <Button
          onClick={() => {
            if (!socket) {
              let s = new WebSocket(getWsUrl() + 'connect')
              console.log('connect to socket ', s)

              setSocket(s)
            }
          }}
        >
          连接服务器
        </Button>

        <div className="flex rounded bg-slate-800 h-10 items-center w-[800px] my-4 px-4 text-white">
          {data}
        </div>
      </div>

      <div className="m-4 bg-slate-100 p-4">
        <div className="text-3xl mb-4">Http 接口</div>

        <div className="flex items-center">
          <div className="mr-2">POST 接口</div>
          <Button
            onClick={() => {
              addProject({}).then((res) => {
                console.log(res.data)
                setPData(JSON.stringify(res.data))
              })
            }}
          >
            创建项目
          </Button>
        </div>
        <div className="py-4">URL: http://120.79.169.245/api/v1/project</div>

        <div className="flex rounded bg-slate-800 h-10 items-center w-[800px] my-4 px-4 text-white">
          {pData}
        </div>
      </div>
    </div>
  )
}

export default Home
