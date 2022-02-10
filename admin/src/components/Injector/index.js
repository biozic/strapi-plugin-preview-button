import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewData } from '../../hooks';
import { pluginId } from '../../utils';
import { PreviewButton } from '../';

const Injector = () => {
  const {
    allLayoutData,
    hasDraftAndPublish,
    isCreatingEntry,
    modifiedData,
  } = useCMEditViewDataManager();
  const { id } = useParams();
  const { uid } = allLayoutData.contentType;
  const uids = useSelector( state => state[ `${pluginId}_config` ].uids );

  const isSupportedType = uids.includes( uid );
  const isSupported = hasDraftAndPublish && isSupportedType;
  const shouldRender = isSupported && ! isCreatingEntry;

  if ( ! shouldRender ) {
    return null;
  }

  const { data, isLoading } = usePreviewData( uid, id );

  if ( isLoading ) {
    return null;
  }

  const { draftUrl, publishedUrl } = data.urls;

  return (
    <PreviewButton
      isDraft={ ! modifiedData.publishedAt }
      draftUrl={ draftUrl }
      publishedUrl={ publishedUrl }
    />
  );
};

export default Injector;