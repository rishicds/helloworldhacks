'use client';
import React, { FormEvent,  useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Updated SVG paths for "HELLOWORLDHACKS"
const pathArr = [
  // H
  'M30 0H15L0 45H18L4 81H16L6 126L34 83L46 126H65V0H50V110H40L30 0Z',
  // E
  'M85 0H125V20H105V55H120V75H105V106H125V126H85V0Z',
  // L
  'M140 0H160V106H195V126H140V0Z',
  // L
  'M210 0H230V106H265V126H210V0Z',
  // O
  'M300 40C323 40 342 58 342 82C342 106 324 126 300 126C276 126 257 106 257 83C257 59 276 40 300 40ZM300 106C315 106 323 96 323 82C323 68 314 58 300 58C286 58 277 69 277 83C277 97 285 106 300 106Z',
  // W
  'M360 40H380L390 90L405 40H420L435 90L445 40H465L445 126H425L410 75L395 126H375L360 40Z',
  // O
  'M495 40C518 40 537 58 537 82C537 106 519 126 495 126C471 126 452 106 452 83C452 59 471 40 495 40ZM495 106C510 106 518 96 518 82C518 68 509 58 495 58C481 58 472 69 472 83C472 97 480 106 495 106Z',
  // R
  'M550 0H595C615 0 630 15 630 35C630 50 620 62 605 65L635 126H610L585 70H570V126H550V0ZM570 20V50H595C605 50 610 45 610 35C610 25 605 20 595 20H570Z',
  // L
  'M640 0H660V106H695V126H640V0Z',
  // D
  'M710 0H750C775 0 795 20 795 63C795 106 775 126 750 126H710V0ZM730 20V106H750C765 106 775 90 775 63C775 36 765 20 750 20H730Z',
  // H
  'M815 0H830L845 45H827L841 81H829L839 126L811 83L800 126H780V0H795V110H805L815 0Z',
  // A
  'M855 40H875L915 126H895L888 110H842L835 126H815L855 40ZM850 90H880L865 60L850 90Z',
  // C
  'M955 40C978 40 998 53 1005 75H985C980 63 969 58 955 58C941 58 930 68 930 83C930 98 940 106 955 106C969 106 980 101 985 89H1005C998 111 978 126 955 126C929 126 910 107 910 83C910 59 929 40 955 40Z',
  // K
  'M1020 0H1040V55L1075 0H1095L1060 55L1095 126H1075L1050 70L1040 85V126H1020V0Z',
  // S
  'M1120 40C1140 40 1155 50 1155 65C1155 95 1105 90 1105 100C1105 105 1110 107 1120 107C1130 107 1135 102 1137 97H1155C1152 115 1140 126 1120 126C1100 126 1085 116 1085 100C1085 70 1135 75 1135 65C1135 60 1130 58 1120 58C1110 58 1105 63 1103 68H1085C1088 50 1100 40 1120 40Z'
];

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  // const [Send, cilentData] = useNewsLetter()
  const [, setOpenPopUp] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const variants = {
    visible: (i: unknown) => ({
      translateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i as number * 0.03,
      },
    }),

    hidden: { translateY: 200 },
  };
  
  const handleNewsLetterData = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    e.preventDefault();
    const target = e.target as HTMLFormElement;


    

    // const data: ClientData = {
    //   email: clientEmail.toString(),
    // }

    // Send(data)
    setOpenPopUp(true);
    target.reset();
    if (setOpenPopUp) {
      setTimeout(() => {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* <Toast.Provider>
        <Toast.Provider swipeDirection="right">
          <Toast.Root
            className="ToastRoot"
            open={openPopup}
            onOpenChange={setOpenPopUp}
          >
            <Toast.Title className="ToastTitle">
              We Received Your Message, Thanks
            </Toast.Title>
            <Toast.Action
              className="ToastAction"
              asChild
              altText="Goto schedule to undo"
            >
              <button className="bg-white text-black px-3 py-1 rounded-lg">
                ok
              </button>
            </Toast.Action>
          </Toast.Root>
          <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
        <Toast.Viewport />
      </Toast.Provider> */}

      <div
        className='relative h-full sm:pt-14 pt-8 bg-[#f7f7f7] text-black'
        ref={container}
      >
        <div className='sm:container px-4 mx-auto'>
          <div className='md:flex justify-between w-full'>
            <div>
              <h1 className='md:text-4xl text-2xl font-semibold'>
                Let&lsquo;s do great work together
              </h1>
              <div className='pt-2 pb-6 md:w-99'>
                <p className='md:text-2xl text-xl py-4'>
                  Sign up for our newsletter*
                </p>
                <div className='hover-button relative bg-black flex justify-between items-center border-2 overflow-hidden border-black rounded-full text-white hover:text-black md:text-2xl'>
                  <form
                    onSubmit={(e) => handleNewsLetterData(e)}
                    className='relative z-2 grid grid-cols-6 w-full h-full'
                  >
                    <input
                      type='email'
                      name='newsletter_email'
                      className='border-none bg-transparent py-3 px-6 col-span-5'
                      placeholder='Your Email * '
                    />{' '}
                    <button
                      type='submit'
                      className='cursor-pointer w-full hover:bg-primaryColor bg-white text-white h-full cols-span-1'
                    >
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 15 15'
                        fill='none'
                        className='w-full h-[80%]'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                          fill='#000'
                          fillRule='evenodd'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className='flex gap-10'>
              <ul>
                <li className='text-2xl pb-2 text-black font-semibold'>
                  SITEMAP
                </li>
                <li className='text-xl font-medium'>
                  <Link href='/'>Home</Link>
                </li>
                <li className='text-xl font-medium'>
                  <Link href='/about'>About us</Link>
                </li>
                
              </ul>
              <ul>
                <li className='text-2xl pb-2 text-black font-semibold'>
                  SOCIAL
                </li>
                <li className='text-xl font-medium'>
                  <a
                    href=' https://www.linkedin.com/company/hello-world-hacks/'
                    target='_blank'
                    className='underline'
                  >
                    LinkedIn
                  </a>
                </li>
                <li className='text-xl font-medium'>
                  <a
                    href=' https://x.com/HelloWorldHacks'
                    target='_blank'
                    className='underline'
                  >
                    Twitter
                  </a>
                </li>
                <li className='text-xl font-medium'>
                  <a
                    href=' https://www.instagram.com/hello.world.hacks?igsh=MTJqcXU5MDJ4dDZmcQ=='
                    target='_blank'
                    className='underline'
                  >
                    Instagram
                  </a>
                </li>
                <li className='text-xl font-medium'>
                  <a
                    href='https://www.facebook.com/profile.php?id=61573844267737'
                    target='_blank'
                    className='underline'
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-y-2 md:py-4 border-gray-200'>
            <motion.svg
              width='1200'
              ref={ref}
              height='137'
              viewBox='0 0 1200 137'
              fill='none'
              className='sm:h-fit h-20 md:px-8 px-2 footer-logo w-full'
              xmlns='http://www.w3.org/2000/svg'
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
            >
              {pathArr.map((path, index) => {
                return (
                  <motion.path
                    key={index}
                    custom={index}
                    variants={variants}
                    d={path}
                    fill='#3E7AEE'
                  />
                );
              })}
            </motion.svg>
          </div>
          <div className='flex md:flex-row flex-col-reverse gap-3 justify-between py-2'>
            <span className='font-medium'>
              &copy; 2025 HelloWorldHacks. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;