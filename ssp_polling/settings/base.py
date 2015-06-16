import os
import sys
from django.core.exceptions import ImproperlyConfigured
from unipath import Path
from email_password import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_USE_SSL

TESTING = len(sys.argv) > 1 and sys.argv[1] == 'test'


try:
    import psycopg2
except ImportError:
    try:
        # Fall back to psycopg2-ctypes
        from psycopg2cffi import compat
        compat.register()
    except ImportError:
        pass

try:
    from .secrets import DATABASES
except ImportError:
    DATABASES = {
        'default': {
            'ENGINE': 'django.contrib.gis.db.backends.spatialite',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }


BASE_DIR = Path(os.path.dirname(os.path.dirname(__file__))).parent

try:
    from secrets import SECRET_KEY
except ImportError:
    SECRET_KEY = None
    raise ImproperlyConfigured("You need to put a SECRET KEY in secrets.py")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []
TEMPLATE_DIRS = (Path(BASE_DIR, 'templates'),)

ADMINS = ()
MANAGERS = ADMINS

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.core.context_processors.request",
    "django.contrib.messages.context_processors.messages",
)

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'core',
    'django_extensions',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'ssp_polling.urls'

WSGI_APPLICATION = 'ssp_polling.wsgi.application'


# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = Path(BASE_DIR, 'static')

# Replacing the standard django user model
# AUTH_USER_MODEL = "core.Member"

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/'
