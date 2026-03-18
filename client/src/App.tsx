import { useState, useEffect } from "react";
import { Search } from "lucide-react";

// Interface de exibição para os Logs
interface Log {
  _id: string;
  lockId: string;
  mac: string;
  sender: string;
  recipient: string;
  messageId: number;
  payload: {
    version: number;
    logId: number;
    timestamp: number;
    type: number;
    method: number;
    isLocked: boolean;
    userId: string;
    userName: string;
    counter: number;
    adminMethod: number;
    targetUserId: string;
    targetUserName: string;
  };
  createdAt: number;
}

// Conversão do EPOCH time para horário tradicional
const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Relação entre o tipo de evento e o código
const eventType: Record<number, string> = {
  1: "abriu",
  2: "fechou",
};

// Relação entre o método de acesso e o código
const accessMethod: Record<number, string> = {
  3: "Cartão RFID",
  4: "aplicativo",
};

function App() {
  // Definir a view
  const [view, setView] = useState<string>("usuario");
  // Agrupa os logs em um array
  const [logsArray, setLogsArray] = useState<Log[]>([]);
  // Texto para filtrar
  const [filter, setFilter] = useState<string>("");
  // Filtro para cada tipo de view
  const [filterField, setFilterField] = useState<string>("userName");
  // Páginas de logs
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Função para agrupar todos os logs
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) throw new Error("Failed to fetch Data");

      const data = await response.json();
      console.log(data);
      setLogsArray(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Renderização dos logs
  useEffect(() => {
    fetchData();
  }, []);

  // Filtro para cada tipo de view
  const filteredLogs = logsArray
    .filter((log) => {
      if (view === "usuario") {
        if (filterField === "userName") {
          return log.payload.userName
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
        if (filterField === "userId")
          return log.payload.userId
            .toLowerCase()
            .includes(filter.toLowerCase());
      }
      if (view === "dispositivo") {
        if (filterField === "mac")
          return log.mac.toLowerCase().includes(filter.toLowerCase());
        if (filterField === "lockId")
          return log.lockId.toLowerCase().includes(filter.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => b.payload.logId - a.payload.logId);

  // Quantidade de logs por páginas
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * 5,
    currentPage * 5,
  );

  const totalPages = Math.ceil(filteredLogs.length / 5);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8">
      <div className=" mb-10 items-center flex flex-col">
        <img
          src="/images/logo_pado_branca.png"
          alt="Pado's logo"
          className="w-40 mb-5"
        />
        <h1 className="font-extrabold text-2xl border-b-4 border-white tracking-wider">
          Logs de acesso identificados:
        </h1>
      </div>
      <div className="flex justify-center mb-5">
        <div>
          <button
            onClick={() => {
              setView("usuario");
              setFilterField("userName");
              setFilter("");
              setCurrentPage(1);
            }}
            className={`transition-all border py-1 px-3 rounded-sm ${view === "usuario" ? "bg-white text-[#0a0f1a]" : "hover:bg-white hover:text-[#0a0f1a]"}`}
          >
            Usuário
          </button>
        </div>
        <div className="ml-10">
          <button
            onClick={() => {
              setView("dispositivo");
              setFilterField("lockId");
              setFilter("");
              setCurrentPage(1);
            }}
            className={`transition-all border py-1 px-3 rounded-sm ${view === "dispositivo" ? "bg-white text-[#0a0f1a]" : "hover:bg-white hover:text-[#0a0f1a]"}`}
          >
            Dispositivo
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-x-10 mb-10">
        <select
          onChange={(e) => setFilterField(e.target.value)}
          className="bg-[#0a0f1a] border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500"
          key={view}
          value={filterField}
        >
          {view === "usuario" ? (
            <>
              <option value="userName">Nome do usuário</option>
              <option value="userId">ID do usuário</option>
            </>
          ) : (
            <>
              <option value="mac">MAC do Dispositivo</option>
              <option value="lockId">ID do dispositivo</option>
            </>
          )}
        </select>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            className="bg-[#0a0f1a] border border-gray-600 text-white pl-9 pr-3 py-2 rounded focus:outline-none focus:border-cyan-500"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar..."
          />
        </div>
      </div>
      <div className="relative flex justify-center">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0d1526] uppercase text-cyan-500">
              <th className="px-6 py-3 text-left">
                {view === "usuario" ? "LockId" : "UserId"}
              </th>
              <th className="px-6 py-3 text-left">Log</th>
              <th className="px-6 py-3 text-left">Data</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLogs.map((log) => (
              <tr
                key={log._id}
                className={`text-gray-300 hover:text-white hover:bg-[#46557c] transition-colors cursor-pointer odd:bg-[#1c2b49] even:bg-[#0d1a35]`}
              >
                <td className="px-6 py-4 font-mono">
                  {view === "usuario" ? log.lockId : log.payload.userId}
                </td>
                <td className="px-6 py-4">
                  {`${log.payload.userName} ${eventType[log.payload.type]} essa porta às ${formatDate(log.payload.timestamp)} por ${accessMethod[log.payload.method]}`}
                </td>
                <td className="px-6 py-4">
                  {formatDate(log.payload.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="border px-4 py-2 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-[#0a0f1a]"
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="border px-4 py-2 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-[#0a0f1a]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
