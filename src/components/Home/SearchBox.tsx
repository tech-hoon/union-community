import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';
import { memo, useRef, useEffect, useState } from 'react';
import { getPostBySearch } from 'api/post';
import { useGetPosts } from 'hooks/useGetPosts';
import { PostType } from 'types';
import useDebounce from 'hooks/useDebounce';

interface Props {}

const SearchBox = (props: Props) => {
  //TODO: value 누락 이슈 해결 (O)
  //TODO: category랑 중복해서 검색되게끔 (X)
  //TODO: custom hook으로 뺄지 말지? (O)

  const [searchBy, setSearchBy] = useState<string>('contents');
  const [value, setValue] = useState<string>('');
  const { setPosts } = useGetPosts();
  const debouncedValue = useDebounce({ value: value, delay: 500 });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSearchBy(e.target.value);
  };
  const onSearchValue = async () => {
    const _posts: any = await getPostBySearch(searchBy, debouncedValue);
    _posts && setPosts(_posts);
  };

  useEffect(() => {
    debouncedValue && onSearchValue();
  }, [debouncedValue]);

  return (
    <Wrapper>
      <Select defaultValue='content' onChange={onSelectChange}>
        <Option value='content'>내용</Option>
        <Option value='creator'>작성자</Option>
      </Select>
      <Input onChange={onInputChange} />
      <SearchIcon onClick={onSearchValue} />
    </Wrapper>
  );
};

export default memo(SearchBox);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #666;
  max-width: 500px;
  width: 50%;
  border-radius: 4px;
  padding: 4px 12px;
  gap: 12px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 50%;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 1em;
`;

const Select = styled.select`
  font-size: 1em;

  padding: 4px 0;
  background: none;
  border: none;
  color: #444;
`;

const Option = styled.option``;

const SearchIcon = styled(Search)`
  width: 20px;
  cursor: pointer;
`;
