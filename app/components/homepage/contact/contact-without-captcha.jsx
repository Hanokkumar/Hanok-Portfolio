"use client";
// @flow strict
import { isValidEmail } from '@/utils/check-email';
import axios from 'axios';
import { useState } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';

function ContactWithoutCaptcha() {
  const [error, setError] = useState({ email: false, required: false });
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: '',
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    console.log(userInput,'userInput')
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const options = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };
    const res = await axios.post('http://3.109.148.179/EmailAPi/api/Mail',{
      FromMailid:"hanok.official.in@gmail.com",
      ToMailid:"itsmehanok2001@gmail.com",
      CcMailid: "",
      CcMailid1: "",
      CcMailid2: "" ,
      
      Subject:` Inquiry from ${userInput.name} - Potential Collaboration/Project Discussion`,
      SmtpServer:"smtp.gmail.com",
      MailPassowrd:"xbfa fagn tfna zrej",
      Body:`<p>Dear Hanok,</p>

      <p>I hope this message finds you well.</p>
      
      <p>My name is ${userInput.name} and I recently visited your portfolio. I was impressed with your work and wanted to reach out to you.</p>
      
      <p>Here are my details:</p>
      
      <p>Name: ${userInput.name}<br>
      Email: ${userInput.email}<br>
      Description: ${userInput.message}</p>
      
      <p>I am interested in discussing potential collaboration opportunities or seeking your expertise on a project. Please let me know when you might be available for a conversation or a meeting.</p>
      
      <p>Looking forward to your response.</p>
      
      <p>Best regards,</p>
      
      <p>${userInput.name}</p>`,
      

      // Body:`<p>Dear Sir/Madam,</p>

      // <p>I hope this email finds you well.</p>
      
      // <p>An amendment has been made to a sales order for our esteemed customer, ${customerNameHelp.label}, with the following details:</p>
      
      // <p>Order Number: ${localStorage.getItem('SalesOrderId')}<br>
      // Date of Order: ${sodate}<br>
      // Amended by:${localStorage.getItem('UserName')}<br>
      // Amended on: ${ (moment(new Date()).format("YYYY-MM-DD"))}</p>
      
      // <p>Your approval for this amended sales order is urgently required to proceed with the necessary steps for processing and fulfillment.</p>
      
      // <p>To review and approve the amended sales order, please access the following URL which will direct you to the approval screen:</p>
      
     
      
      // <p>Regards,</p>
      
      //   <p>${localStorage.getItem('UserName')}</p>`,
      SmtpPort:587,
      Filepathattach:""


   },
  )  
  if (res.status === 200 ) {
    toast.success('Message sent successfully!');
    setUserInput({
      name: '',
      email: '',
      message: '',
    });
  };
    try {
      const res = await emailjs.send(serviceID, templateID, userInput, options);
      // const teleRes = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);

  
    
    
      //  ).then((res)=> {
        
       
      //  })
      
      
       // toastr.success('Mail Sent Successfully', 'Approval')
    
    
      
    

      if (res.status === 200 || teleRes.status === 200) {
        toast.success('Message sent successfully!');
        setUserInput({
          name: '',
          email: '',
          message: '',
        });
      };
    } catch (error) {
      toast.error(error?.text || error);
    };
  };

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email &&
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            }
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required &&
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            }
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
            >
              <span>Send Message</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWithoutCaptcha;