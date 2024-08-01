import { NextPage } from 'next';
import { company, program, terms_polices  } from '../../utils/constants';

const List = ({ items, mt, title }: { items: string[], mt: Boolean, title: String }) => (
    <>
        <h4 className='mt-4 text-copy-lighter  text-base leading-normal font-bold'>{title}</h4>
        <div className={`flex flex-wrap gap-2 ${mt && 'mt-2'}`}>
            {items.map((item: string) => (
                <p key={item} className='text-copy-lighter text-xs leading-[16px] font-semibold mr-1.5 mt-1 hover:underline cursor-pointer' >
                {item}
            </p>
            ))}
        </div>
    </>
);

const Footer: NextPage = () => (
  <div className='hidden xl:block'>
    <List items={company} mt={false} title="Company" />
    <List items={program} mt title="Program" />
    <List items={terms_polices} mt title="Terms & Plicies" />
    <p className='text-copy-lighter text-xs leading-[16px] text-center font-semibold mr-1.5 mt-10'>© 2022 Tik Tok</p>
  </div>
);

export default Footer;