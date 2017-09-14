if [ "" != "$2" ]; then
    humble exec $2 bash
else
    echo "enter service name"
fi
