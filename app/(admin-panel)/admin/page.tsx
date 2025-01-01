import React from 'react';
import { TableGrid } from '../../components/TableGrid';
import {redirect} from 'next/navigation';
import { getSession } from '@/lib/getSession';


const Page = async() => {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  if (!user) {
    redirect('/login');
  }
  // if (user.role !== 'admin') {
  //   redirect('/');
  // }
  return (
    <>
      <TableGrid/>
    </>
  );
};

export default Page;
