import type { ResponseType } from './types';
import { Link } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';

const defaultRequestData = {
  url: '/hot-search-list.json',
  method: 'GET',
}

const Search = () => {
  const localSearchList = localStorage.getItem('search-list');
  const searchListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];

  const [historyList, setHistoryList] = useState(searchListHistory);
  const [keyword, setKeyword] = useState('');

  const { data } = useRequest<ResponseType>(defaultRequestData);
  const hotList = data?.data || [];

  function handleKeyDown(key: string) {
    if (key === 'Enter') {
      const newHistoryList = [...historyList];
      newHistoryList.unshift(keyword);
      if (newHistoryList.length > 10) {
        newHistoryList.length = 10;
      }
      setHistoryList(newHistoryList);
      setKeyword('');
      localStorage.setItem('search-list', JSON.stringify(newHistoryList));
    }
  }

  function handleHistoryListClick() {
    setHistoryList([]);
    localStorage.setItem('search-list', JSON.stringify([]));
  }

  return (
    <div className="page search-page">
      <div className='search'>
        <Link to='/home' className='search-back-link'>
          <div className='search-back-icon iconfont'>&#xe601;</div>
        </Link>
        <div className='search-area'>
          <div className='search-icon iconfont'>&#xe64e;</div>
          <input className='search-input'
            placeholder='please input the product name'
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value) }}
            onKeyDown={(e) => { handleKeyDown(e.key) }} />
        </div>
      </div>
      {historyList.length ? (
        <>
          <div className='title'>
            seach history
            <div onClick={handleHistoryListClick} className='iconfont title-close'>&#xe844;</div>
          </div>
          <ul className='list'>
            {
              historyList.map((item, index) => {
                return <li className='list-item' key={item + index}> {item}</li>
              })
            }
          </ul>
        </>
      ) : null}

      {historyList.length ? (
        <>
          <div className='title'>
            hot list
            {/* <div onClick={handleHotListClick} className='iconfont title-close'>&#xe844;</div> */}
          </div>
          <ul className='list'>
            {
              hotList.map(item => {
                return <li className='list-item' key={item.id}> {item.keyword}</li>
              })
            }
          </ul>
        </>
      ) : null}
    </div>
  )
}

export default Search;