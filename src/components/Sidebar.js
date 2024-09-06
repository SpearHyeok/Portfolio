import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // CSS 파일 임포트

function Sidebar() {
  const [markdownFiles, setMarkdownFiles] = useState({});

  useEffect(() => {
    const loadMarkdownFiles = () => {
      const context = require.context('../markdown', true, /\.md$/);
      const files = {};

      // context.keys()로 파일 경로를 모두 가져옴
      context.keys().forEach((filePath) => {
        const folder = filePath.split('/')[1]; // 첫 번째 경로를 폴더명으로 사용
        const fileName = filePath.split('/').pop(); // 파일명만 추출

        if (!files[folder]) {
          files[folder] = [];
        }

        files[folder].push(fileName); // 각 폴더에 파일 추가
      });

      setMarkdownFiles(files);
    };

    loadMarkdownFiles();
  }, []);

  return (
    <div className='Sidebar'>
      <h3>Portfolio</h3>
      <ul>
        <Link className='Home_btn' to={'/'}>
        Home
        </Link>
        {Object.keys(markdownFiles).map((folder) => (
          <div key={folder}>
            <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>{folder}</h4>
            {markdownFiles[folder].map((file) => (
              <li key={file} style={{ listStyleType: 'none', marginLeft: '10px' }}>
                <Link
                  to={`/${folder}/${file.replace('.md', '')}`}
                  className="sidebar-link" // CSS 클래스 추가
                >
                  {file.replace('.md', '')}
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;