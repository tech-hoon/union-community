import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';
import { memo, useEffect, useState } from 'react';
import { getPostBySearch } from 'api/post';
import { useGetPosts } from 'hooks/post/useGetPosts';
import useDebounce from 'hooks/common/useDebounce';

const SearchBox = () => {
  // const [searchBy, setSearchBy] = useState<string>('contents');
  // const [value, setValue] = useState<string>('');
  // const { category, orderBy, setPosts } = useGetPosts();
  // const debouncedValue = useDebounce({ value: value, delay: 500 });
  // const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setValue(e.target.value);
  // };
  // const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
  //   setSearchBy(e.target.value);
  // };
  // const onSearchValue = async () => {
  //   const _posts: any = await getPostBySearch(category, orderBy, searchBy, debouncedValue);
  //   _posts && setPosts(_posts);
  // };
  // useEffect(() => {
  //   // debouncedValue && onSearchValue();
  // }, [debouncedValue]);
  // return (
  //   <Wrapper>
  //     <Select defaultValue='content' onChange={onSelectChange}>
  //       <Option value='content'>내용</Option>
  //       <Option value='creator'>작성자</Option>
  //     </Select>
  //     <Input onChange={onInputChange} />
  //     <SearchIcon size='20px' onClick={onSearchValue} />
  //   </Wrapper>
  // );
  <div>hello</div>;
};

export default SearchBox;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dbdbdb;
  max-width: 700px;
  border-radius: 4px;
  padding: 2px 12px;
  gap: 12px;
  margin: 20px 0;
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
  cursor: pointer;
`;
