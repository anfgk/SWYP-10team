import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'
import PopularList from './components/PopularList'
import ThemeList from './components/ThemeList'
import AiRecList from './components/AiRecList'
import SearchPanel from './components/SearchPannel'

function App() {
    return (
      <BrowserRouter>
        <div className='App'>
          <MainHeader />
            <main className='flex flex-col gap-[72px] py-[72px]'>
              <SearchPanel />
              <ThemeList />
              <PopularList />
              <AiRecList />
            </main>
          <MainFooter />         
        </div>
      </BrowserRouter>
  )
}

export default App
