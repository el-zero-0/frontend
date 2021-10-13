import { useEffect, useState } from 'react'
import { getArticles, createArticle, updateArticleById, deleteArticleById } from './components/ArticleServices';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function App() {
  const [articles, setArticles] = useState([])
  const [queryChanged, setQueryChange] = useState(false)
  useEffect(() => {
    async function fun() {
      const data = await getArticles()
      setArticles(data)
    }
    fun();
  }, [queryChanged])
  const handleRowAdd = async (newData) => {
    const res = await createArticle(newData)
    if (res) {
      setQueryChange(!queryChanged)
    }
  }
  const handleRowUpdate = async (newData, oldData) => {
    const res = await updateArticleById(newData)
    if (res) {
      setQueryChange(!queryChanged)
    }
  }
  const handleRowDelete = async(oldData) => {
    await deleteArticleById(oldData._id)
    setQueryChange(!queryChanged)
  }
  return (
    <div className="p-5 m-5">
      <div className='col'>
        <MaterialTable
          title="ТИТЛЕ"
          columns={[
            { title: "Назва", field: "title" },
            { title: "Контєнт", field: "content" },
            { title: "Автор", field: "owner" }
          ]}
          icons={{
            Add: () => <AddIcon />,
            Edit: () => <EditIcon style={{ color: "#009a66" }} />,
            Delete: () => <DeleteIcon style={{ color: "#ff0000" }} />
          }}
          data={articles}
          editable={{
            onRowAdd: handleRowAdd,
            onRowUpdate: handleRowUpdate,
            onRowDelete: handleRowDelete
          }}
          options={
            {
              actionsColumnIndex: -1,
              addRowPosition: 'first',
              rowStyle: {
                fontSize: "0.865rem",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
              },
              headerStyle: { fontWeight: '600' },
              toolbarButtonAlignment: "left"
            }
          }
        />
      </div>
    </div>
  );
}

export default App;
