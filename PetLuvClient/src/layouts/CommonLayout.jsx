import PropTypes from 'prop-types';
import { Footer, Header } from '../components';
import { useEffect, useMemo } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useSelector } from 'react-redux';

const CommonLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const chatOptions = useMemo(
    () => ({
      webhookUrl:
        'http://localhost:5678/webhook/cbccf511-d695-47ae-811d-4df77e7e0595/chat',
      webhookConfig: {
        method: 'POST',
        header: {},
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {
        userId: currentUser?.userId || '',
      },
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Xin chào! 👋',
        'Tôi là Sú Gơ, trợ lý ảo của PetLuv. Bạn cần hỗ trợ gì không?',
      ],
      i18n: {
        en: {
          title: 'Xin chào! 👋',
          subtitle: 'Trợ lý ảo Sú Gơ hỗ trợ 24/7',
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Bạn cần gì...',
        },
      },
    }),
    [currentUser]
  );

  useEffect(() => {
    createChat(chatOptions);
  }, [chatOptions]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
